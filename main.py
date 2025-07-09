# create the app
from flask import Flask
from src import db
from src.users.routes import users_bp
from src.utils import show_routes
# from flask_migrate import Migrate






app = Flask(__name__)
# configure the SQLite database, relative to the app instance folder
app.config.from_object('src.config.Config')
# initialize the app with the extension
db.init_app(app)
# migrate = Migrate(app, db)
# register the blueprint for users routes
app.register_blueprint(users_bp, url_prefix="/api/v1")



if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Create database tables
    app.run(debug=True, port=5050)
    print(" Server is running... http://localhost:5050/api/v1/")
    show_routes(app)  # Show all routes in the app
