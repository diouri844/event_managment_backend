
# time to setting up a sqlAlchemy model 

from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, ForeignKey,relationship
from src import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash




class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(unique=True)
    email: Mapped[str]
    password: Mapped[str]
    role_id: Mapped[int] = mapped_column(ForeignKey("roles.id"))
    role = relationship("Role", back_populates="users", ondelete="CASCADE")    
    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        default=datetime.utcnow, 
        onupdate=datetime.utcnow
    )
    __tablename__ = "users"
    __table_args__ = {"extend_existing": True}
    def __repr__(self):
        return f"<User {self.username}, {self.email}, {self.role}>"
    
    def set_password(self, password: str):
        self.password = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        return check_password_hash(self.password, password)


    

