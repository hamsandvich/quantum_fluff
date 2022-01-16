from typing import Optional, List

from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel

from pymongo import MongoClient
from bson.objectid import ObjectId

client = MongoClient("127.0.0.1:27017")
db = client.quantum_fluff

class User(BaseModel):
    firstName: str
    lastName: str
    password: str
    email: str
    university: str
    major: str
    minor: str

class Review(BaseModel):
    userID: str
    review: str
    difficulty: int
    prof: str
    recommend: bool



app = FastAPI()


@app.post("/register/")
async def create_user(user: User):
    if db.Users.count_documents({'email': user.email}) > 0:
        return {
            'success': False,
            'error': {
                'code': 1,
                'message': "User already exists."
            }
        }
    else:
        json_compatible_user_data = jsonable_encoder(user)
        r = db.Users.insert_one(json_compatible_user_data)
        return {'success': True}

class Auth(BaseModel):
    email: str
    password: str

@app.post("/authenticate/")
async def auth_user(user: Auth):
    if db.Users.count_documents({'email': user.email}) > 0:
        r = db.Users.find_one({'email': user.email})
        if r['password'] == user.password:
            return {'success': True}
        else:
            return {
                'success': False,
                'error': {
                    'code': 2,
                    'message': "Email/Password combination doesn't match."
                }
            }
    else:
        return {
            'success': False,
            'error': {
                'code': 3,
                'message': "User does not exist."
            }
        }


@app.get("/user_info_by_id/")
async def user_info_id(id: str):
    if db.Users.count_documents({'_id': ObjectId(id)}) > 0:
        r = db.Users.find_one({'_id': ObjectId(id)})
        r['_id'] = str(r['_id'])
        r.pop('password', None)
        return {
            'success': True,
            'user_info': r
        }
    else:
        return {
            'success': False,
            'error': {
                'code': 3,
                'message': "User does not exist."
            }
        }

@app.post("/modify_user/")
async def modify_user(user: User):
    if db.Users.count_documents({'email': user.email}) > 0:
        json_compatible_user_data = jsonable_encoder(user)
        db.Users.update_one({'email': user.email}, {'$set': json_compatible_user_data})
        return {
            'success': True
        }
    else:
        return {
            'success': False,
            'error': {
                'code': 3,
                'message': "User does not exist."
            }
        }

class CourseRequest(BaseModel):
    name: str
    department: str

@app.post("/add_course/")
async def add_course(course: CourseRequest):
    if db.Courses.count_documents({'name': course.name}) > 0:
        return {
            'success': False,
            'error': {
                'code': 4,
                'message': "Course already exists."
            }
        }
    else:
        json_compatible_course_data = jsonable_encoder(course)
        json_compatible_course_data['profs'] = []
        json_compatible_course_data['reviews'] = []
        r = db.Courses.insert_one(json_compatible_course_data)
        return {'success': True}

@app.get("/course_info/")
async def course_info(courseName: str):
    if db.Courses.count_documents({'name': course.name}) > 0:
        r = db.Courses.find_one({'name': course.name})
        r['_id'] = str(r['_id'])
        return {
            'success': True,
            'course_info': r
        }
    else:
        return {
            'success': False,
            'error': {
                'code': 5,
                'message': "Course does not exist."
            }
        }


class ReviewRequest(BaseModel):
    courseName: str
    department: str
    review: Review

@app.post("/add_review/")
async def add_review(review: ReviewRequest):
    prof = review.review.prof
    if db.Courses.count_documents({'name': review.courseName, 'department': review.department}) > 0:
        course = db.Courses.find_one({'name': review.courseName, 'department': review.department})
        if prof not in course['profs']:
            db.Courses.update_one({'name': review.courseName}, {'$push': {'profs': prof}})
        json_compatible_course_data = jsonable_encoder(review.review)
        db.Courses.update_one({'name': review.courseName}, {'$push': {'reviews': json_compatible_course_data}})
        return {
            'success': True
        }
    else:
        return {
            'success': False,
            'error': {
                'code': 5,
                'message': "Course does not exist."
            }
        }
