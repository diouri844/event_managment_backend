# create the app
from flask import Flask
from src import db







app = Flask(__name__)
# configure the SQLite database, relative to the app instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
# initialize the app with the extension
db.init_app(app)








if __name__ == "__main__":
    print(" Server is running... ")