#/bin/bash
cd ./client
npm i && npm run build
cd ../server
pip install -r requirements.txt
python -m flask --app server run &
cd ../client
npm run dev