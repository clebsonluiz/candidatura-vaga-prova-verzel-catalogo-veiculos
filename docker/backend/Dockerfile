FROM python:slim

ENV PYTHONUNBUFFERED 1

# RUN groupadd user && useradd --create-home --home-dir /home/user -g user user

RUN apt-get update && apt-get install python3-dev gcc default-libmysqlclient-dev build-essential pkg-config libpq-dev -y

WORKDIR /app/backend
COPY /backend/requirements.txt /app/backend/requirements.txt



RUN pip install --upgrade pip 
RUN pip install cmake
RUN pip install wheel
RUN pip install -r requirements.txt
COPY /backend /app/backend