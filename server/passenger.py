from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import validates 
from association import flight_passenger_association



from config import db, bcrypt


class Passenger(db.Model):

    __tablename__ = 'passengers'

    id = db.Column(Integer, primary_key=True)
    name = db.Column(String)
    email = db.Column(String)
    _password = db.Column(String)
    age = db.Column(Integer)
    is_admin = db.Column(String)
    passport_number = db.Column(String)


    flights = db.relationship("Flight", secondary=flight_passenger_association, back_populates="passengers")
    
    def __init__(self, name, email, _password, age, is_admin, passport_number):
        self.bcrypt = bcrypt
        self.name = name
        self.email = email
        self._password = _password  
        self.age = age
        self.is_admin = is_admin
        self.passport_number = passport_number


    @property
    def password(self):
        return self._password

    @password.setter
    def password(self, plaintext_password):
      
        self._password = bcrypt.generate_password_hash(plaintext_password).decode('utf-8')

    def check_password(self, plaintext_password):
        
        return bcrypt.check_password_hash(self._password, plaintext_password)