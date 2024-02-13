from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime, func, Boolean
from sqlalchemy.orm import validates 


from config import db



class Pilot(db.Model):

    __tablename__ = 'pilots'

    id = Column(db.Integer, primary_key=True)
    name = Column(db.String(255), unique=True, nullable=False)
    age = Column(db.Integer)

    flights = db.relationship("Flight", back_populates="pilot")

    

    def __init__(self, name, age, ):
        self.name = name
        self.age = age
        