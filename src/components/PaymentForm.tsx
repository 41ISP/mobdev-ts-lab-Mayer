import { FormEvent, useState } from "react"
import { IPayment, TCategory } from "../types"
import { todayISO } from "../format"
import { usePaymentsStore } from "./store"
import { CATEGORY_LABELS, CATEGORY_LIST } from "../categories"



export default function PaymentForm() {
  // 4.1. Состояние
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [due, setDue] = useState(todayISO())
  const [category, setCategory] = useState<TCategory>('video')
  const [error, setError] = useState('')

  const addPayment = usePaymentsStore((state) => state.addPayment)


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

 
    const normalizedAmount = amount.trim().replace(',', '.')
    const amountNumber = Number(normalizedAmount)


    if (title.trim() === '') {
      setError('Введите название подписки')
      return
    }

    if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
      setError('Введите корректную цену больше нуля')
      return
    }

    if (!due) {
      setError('Выберите дату оплаты')
      return
    }


    addPayment({
      title: title.trim(),
      amount: amountNumber,
      due,
      category,
    })

    setTitle('')
    setAmount('')
    setError('')
  }

  return (
    <form className="box" onSubmit={handleSubmit}>
      <h2 className="h">Новая подписка</h2>

      <label className="field">
        <span>Название</span>
        <input
          type="text"
          placeholder="Например, Figma"
          maxLength={60}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <div className="two">
        <label className="field">
          <span>Цена, ₽</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label className="field">
          <span>Оплатить до</span>
          <input
            type="date"
            value={due}
            onChange={(e) => setDue(e.target.value)}
          />
        </label>
      </div>

      <label className="field">
        <span>Категория</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as TCategory)}
        >
        
          {CATEGORY_LIST.map((key) => (
            <option key={key} value={key}>
              {CATEGORY_LABELS[key]}
            </option>
          ))}
        </select>
      </label>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      <button className="btn" type="submit">
        Добавить
      </button>
    </form>
  )
}