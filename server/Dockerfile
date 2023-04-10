# syntax=docker/dockerfile:1
FROM python:3.11
WORKDIR /app
ENV FLASK_APP=server.py
ENV FLASK_RUN_HOST=0.0.0.0
COPY /server /server
COPY /client /client
RUN pip install -r /server/requirements.txt
EXPOSE 5000
WORKDIR /server
CMD ["python", "server.py"]
CMD ["npm"]