cd ./client
call npm i
cd ../server
call pip install -r requirements.txt
cd ../client
start npm run dev
cd ../server
call python -m flask --app server run 