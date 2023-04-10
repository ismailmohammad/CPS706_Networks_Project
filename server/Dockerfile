# syntax=docker/dockerfile:1
FROM python:3.11
WORKDIR /server
ENV FLASK_APP=server.py
ENV FLASK_RUN_HOST=0.0.0.0
COPY . .
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["python", "-m", "flask", "run"]