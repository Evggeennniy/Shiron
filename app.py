from flask import Flask, redirect, request, render_template
from dotenv import load_dotenv
import requests
import os

load_dotenv()

bot_token = os.getenv('BOT_API_TOKEN')
chat_id = os.getenv('CHAT_ID')

app = Flask(__name__)


def send_telegram_message(message, chat_id, bot_token):
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    respond = requests.get(url, params={"chat_id": chat_id, "text": message})


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/make_order', methods=['POST',])
def make_order():
    product = request.form.get('product', 'Не указано')
    name = request.form.get('name', 'Не указано')
    number = request.form.get('number', 'Не указано')
    mail = request.form.get('mail', 'Не указано')
    quantity = request.form.get('quantity', 'Не указано')

    message = (
        "🛒 Новый заказ\n"
        f"Товар: {product}\n"
        f"Имя: {name}\n"
        f"Телефон: {number}\n"
        f"Email: {mail}\n"
        f"Количество: {quantity}"
    )

    send_telegram_message(message, chat_id, bot_token)

    return redirect('/')


@app.route('/work_with_us', methods=['POST',])
def work_with_us():
    name = request.form.get('name', 'Не указано')
    number = request.form.get('number', 'Не указано')
    mail = request.form.get('mail', 'Не указано')
    text = request.form.get('text', 'Не указано')

    message = (
        "🤝 Новая заявка на сотрудничество\n"
        f"Имя: {name}\n"
        f"Телефон: {number}\n"
        f"Email: {mail}\n"
        f"Сообщение: {text}"
    )

    send_telegram_message(message, chat_id, bot_token)

    return redirect('/')


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
