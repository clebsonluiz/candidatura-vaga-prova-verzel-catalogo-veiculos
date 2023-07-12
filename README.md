# VERZEL - CATÁLOGO DE VEÍCULOS
Projeto de candidatura de vaga junior 

## Instalação


O projeto apresenta um sistema de CRUD básico para um catálogo de veículos. Funcionando separadamente em duas partes, o backend (Django com Python 3.9) e o frontend (ReactJs + Vite usando o Node 18). O 'Banco de dados' é o MySQL configurado pelo Docker para não ter perda de tempo com outras configurações externas.

Desta forma, para executar o projeto é necessários os seguintes. 

## 1.Executando um container com Docker e Docker compose. 


Caso tenha o [Docker](https://www.docker.com/) e o docker-compose instalados, basta executar os seguintes comandos na raiz do projeto.

```bash
docker-compose build
```
Para criar os containers do projeto, em caso de sucesso na sequencia execute o comando:
```bash
docker-compose up
```
Para iniciar os containers do backend e do frontend. 

O frontend do projeto é acessado no navegador na url ```http://localhost:5555``` e o backend pelo ```http://localhost:8888```. Configurados dentro do proprio projeto para serem nessas urls. Para fazer o login na conta de privilégios administrativos, basta logar no sistema com a conta já existente {username: 'admin', password: 'administrador'}. (Criada automaticamente durante a migração do banco de dados) e acessar as opções presentes no header da página em react. Ou se quiser criar um usuário ADMIN novo basta acessar o terminal do container do backend e usar o comando:
```bash
python manage.py createsuperuser
```
Basta digitar o username e password escolhidos para acessar a conta de admin.

## 2. Executando localmente 

Caso não tenha o docker e docker-compose intalados. Primeiro é necessário editar a base de dados no arquivo settings.py no backend e defini-lo para as configurações que o Você deseja usar:

Por exemplo, para usar o mysql é necessário instalar o mysqlclient (já presente no requirements.txt) e definir a configuração em settings.py assim :

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'django_mysql_local',
        'USER': 'root',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '3306',
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"
        }
    }
}
```
Caso não deseja mudar o banco basta ignorar essa parte.

Agora possível executar o projeto com os seguintes comandos. Na raiz do projeto abra um terminal e execute:

```bash
cd backend
```
execute o comando:
```bash
pip install -r requirements.txt
```
Após instaladas as dependencias do python execute as migrações do banco de dados

```bash
python manage.py migrate
```
Em seguida caso queira criar um usuário ADMIN com o comando, caso contrário basta usar a conta mencionada anteriormente para acessar o sistema:
```bash 
python manage.py createsuperuser
```
após isso execute o comando: 
```bash
python manage.py runserver 0.0.0.0:8888
```
Para rodar o backend na porta correta para que o frontend possa acessa-lo. Agora abra um outro terminal na raíz do projeto e execute o comando:

```bash
cd frontend
```
execute o comando:
```bash
npm install
```
Após instaladas as dependencias do node execute o comando:

```bash
npm run dev
```
A porta 5555 já está configurada no projeto no arquivo vite.config.js. 

Para acessar a aplicação basta abrir o navegador e digitar a url ```http://localhost:5555``` e o backend pelo ```http://localhost:8888```.

## License

[MIT?](https://choosealicense.com/licenses/mit/)