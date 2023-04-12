cd ./client
call npm i
cd ../server
call pip install -r requirements.txt
start python -m flask --app server run &
cd ../client
call npm run dev