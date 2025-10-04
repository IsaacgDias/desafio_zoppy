# espera o MySQL estar pronto
until nc -z -v -w30 $DB_HOST $DB_PORT
do
  echo "Aguardando o MySQL..."
  sleep 2
done
echo "MySQL pronto, iniciando backend..."
exec npm run start
