export SECRETTOKEN=mysecrettoken
export MONGOURI="mongodb+srv://admin:admin@mentordb-yx8mq.mongodb.net/mentorDB?retryWrites=true&w=majority"
export HOST=localhost
export PORT=5000

cd ../

nodemon server
