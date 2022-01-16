from typing import Optional, List

from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
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
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
        db.Users.insert_one(json_compatible_user_data)
        r = db.Users.find_one({'email': user.email})
        return {
            'success': True,
            'id': str(r['_id'])
        }

class Auth(BaseModel):
    email: str
    password: str

@app.post("/authenticate/")
async def auth_user(user: Auth):
    if db.Users.count_documents({'email': user.email}) > 0:
        r = db.Users.find_one({'email': user.email})
        if r['password'] == user.password:
            return {
                'success': True,
                'id': str(r['_id'])
            }
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
    university: str
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
    if db.Courses.count_documents({'name': courseName}) > 0:
        r = db.Courses.find_one({'name': courseName})
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
    university: str
    review: Review

@app.post("/add_review/")
async def add_review(review: ReviewRequest):
    prof = review.review.prof
    if db.Courses.count_documents({'name': review.courseName, 'university': review.university}) > 0:
        course = db.Courses.find_one({'name': review.courseName, 'university': review.university})
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


@app.get("/course_info_by_name/")
async def course_info_name(name: str):
    if db.Courses.count_documents({'name': name}) > 0:
        temp = db.Courses.find({'name': name})
        r = {
            'success': True,
            'course_info': []
        }
        for i in temp:
            i.pop("_id", None)
            r['course_info'].append(i)
        return r
    else:
        return {
            'success': False,
            'error': {
                'code': 5,
                'message': "Course does not exist."
            }
        }

@app.get("/course_info_by_university/")
async def course_info_univercity(univercity: str):
    if db.Courses.count_documents({'university': univercity}) > 0:
        temp = db.Courses.find({'university': univercity})
        r = {
            'success': True,
            'course_info': []
        }
        for i in temp:
            i.pop("_id", None)
            r['course_info'].append(i)
        return r
    else:
        return {
            'success': False,
            'error': {
                'code': 5,
                'message': "Course does not exist."
            }
        }

@app.get("/course_info_by_department/")
async def course_info_department(department: str):
    if db.Courses.count_documents({'department': department}) > 0:
        temp = db.Courses.find({'department': department})
        r = {
            'success': True,
            'course_info': []
        }
        for i in temp:
            i.pop("_id", None)
            r['course_info'].append(i)
        return r
    else:
        return {
            'success': False,
            'error': {
                'code': 5,
                'message': "Course does not exist."
            }
        }