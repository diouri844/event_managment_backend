from flask import Blueprint, jsonify, request
from src.users.model import User
from src import db
from flask_jwt_extended import jwt_required, get_jwt_identity


# setup a blueprint for the users routes
users_bp = Blueprint("users", __name__)

@users_bp.route("/users", methods=["GET"])
# @jwt_required()
def get_users():
    """
    Get all users with pagination support.
    parameters:
    - page: The page number to retrieve (default is 1).
    - per_page: The number of users per page (default is 10).
    Returns:    
    - A JSON response containing the list of users, pagination info, and the token.
    - If an error occurs, a JSON response with the error message.
    """
    try:
        page = request.args.get("page", 1, type=int)
        per_page = request.args.get("per_page", 10, type=int)
        users = User.query.all().paginate(page=page, per_page=per_page, error_out=False).items

        # time to format data : 
        res_object = {
            "message": "Users retrieved successfully",
            "status": "success",
            "page": page,
            "per_page": per_page,
            "total": User.query.count(),
            "users": [user.to_dict() for user in users],
            "token": get_jwt_identity()
        }
        return jsonify(res_object), 200
    except Exception as e:
        print(f"Error fetching users: {e}")
        return jsonify({"message": "Server failed to fetch user list "}), 500
    

@users_bp.route("/users/<int:user_id>", methods=["GET"])
# @jwt_required()
def get_user(user_id):
    """
    Get a user by ID.
    parameters:
    - user_id: The ID of the user to retrieve.
    Returns:
    - A JSON response containing the user data and the token.
    - If an error occurs, a JSON response with the error message.
    """
    try:
        user = User.query.get_or_404(user_id)
        res_object = {
            "message": "User retrieved successfully",
            "status": "success",
            "user": user.to_dict(),
            "token": get_jwt_identity()
        }
        return jsonify(res_object), 200
    except Exception as e:
        return jsonify({"error": "Server failed to fetch user by id"}), 500



@users_bp.route("/users", methods=["POST"])
# @jwt_required()
def create_user():
    """
    Create a new user.
    Request body should contain:
    - username: The username of the user.
    - email: The email of the user.
    - password: The password of the user.
    Returns:
    - A JSON response containing the created user data and the token.
    - If an error occurs, a JSON response with the error message.
    """
    try:
        data = request.get_json()
        new_user = User(
            username=data["username"], 
            email=data["email"], 
            password=data["password"]
        )
        new_user.save()
        res_object = {
            "message": "User created successfully",
            "status": "success",
            "user": new_user.to_dict(),
            "token": get_jwt_identity()
        }
        return jsonify(res_object), 201
    except Exception as e:
        db.session.rollback()  # Rollback the session in case of error
        return jsonify({"error":"Server failed to create new user "}), 500
    

@users_bp.route("/users/<int:user_id>", methods=["PUT"])
# @jwt_required()
def update_user(user_id):
    """
    Update an existing user by ID.
    Request body should contain:
    - username: The new username of the user (optional).
    - email: The new email of the user (optional).
    - password: The new password of the user (optional).
    Returns:
    - A JSON response containing the updated user data and the token.
    - If an error occurs, a JSON response with the error message.
    """
    try:
        data = request.get_json()
        user = User.query.get_or_404(user_id)
        user.username = data.get("username", user.username)
        user.email = data.get("email", user.email)
        user.password = data.get("password", user.password)
        user.save()
        
        res_object = {
            "message": "User updated successfully",
            "status": "success",
            "user": user.to_dict(),
            "token": get_jwt_identity()
        }
        return jsonify(res_object), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Server failed to update user by id "}), 500


