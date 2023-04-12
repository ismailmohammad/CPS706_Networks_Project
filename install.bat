cd ./client
call npm i
cd ../server
call pip install -r requirements.txt
cd ../client
call npm run dev
cd ../server
start python -m flask --app server run &