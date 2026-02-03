from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import database
from app.routers import tasks

app = FastAPI(title="SimpleTodo API")

@app.on_event("startup")
def startup():
    database.Base.metadata.create_all(bind=database.engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router)

@app.get("/")
def read_root():
    return {"message": "SimpleTodo API is running"}
