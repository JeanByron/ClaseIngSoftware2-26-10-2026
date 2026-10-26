FROM node
WORKDIR /app
COPY . .
#RUN es para instalar dependencias
CMD ["node", "index.js"]

#FROM python
#WORKDIR /app
#COPY . .
#RUN pip install flask
#CMD ["python", "app.py"]