cd ./client
call npm i
call npm run build
cd ../server
call pip install -r requirements.txt
cd ../client
start npm run start
cd ../server
call python -m flask --app server run 