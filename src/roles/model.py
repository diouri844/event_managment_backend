# src/models/role.py

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src import db
from src.users import User
class Role(db.Model):
    __tablename__ = "roles"
    __table_args__ = {"extend_existing": True}
    
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(unique=True, nullable=False)  # e.g. "admin", "organizer", "attendee"
    description: Mapped[str] = mapped_column(nullable=True)
    # Use string for relationship to avoid circular import
    users: Mapped[list["User"]] = relationship(
    "User",
        secondary="user_roles",
        back_populates="roles",
    )

    def __repr__(self):
        return f"<Role {self.name}, {self.description}>"
    
    def add_role(self, name: str, description: str = None):
        """Add a new role to the database."""
        new_role = Role(name=name, description=description)
        db.session.add(new_role)
        db.session.commit()
        return new_role
    

class UserRole(db.Model):
    __tablename__ = "user_roles"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    role_id: Mapped[int] = mapped_column(ForeignKey("roles.id"), nullable=False)