from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import database
from app.routers import tasks
from app.logging_config import logger
from app.middleware import log_request_time

app = FastAPI(title="SimpleTodo API")

@app.on_event("startup")
def startup():
    database.Base.metadata.create_all(bind=database.engine)
    logger.info("SimpleTodo API starting up")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("SimpleTodo API shutting down")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.middleware("http")(log_request_time)

app.include_router(tasks.router)

@app.get("/")
def read_root():
    logger.info("Root endpoint accessed")
    return {"message": "SimpleTodo API is running"}
