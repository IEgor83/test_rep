from tkinter import *
from tkinter import messagebox


def calculate_bmi():
    kg = int(weight_tf.get())
    m = int(height_tf.get()) / 100
    bmi = kg / (m * m)
    bmi = round(bmi, 1)

    if bmi < 18.5:
        messagebox.showinfo('bmi-pythonguides', f'ИМТ = {bmi} соответствует недостаточному весу')
    elif (bmi > 18.5) and (bmi < 24.9):
        messagebox.showinfo('bmi-pythonguides', f'ИМТ = {bmi} соответствует нормальному весу')
    elif (bmi > 24.9) and (bmi < 29.9):
        messagebox.showinfo('bmi-pythonguides', f'ИМТ = {bmi} соответствует избыточному весу')
    else:
        messagebox.showinfo('bmi-pythonguides', f'ИМТ = {bmi} соответствует ожирению')


window = Tk()
window.title('Калькулятор индекса массы тела (ИМТ)')
window.geometry('400x300')

frame = Frame(
    window,
    padx=10,
    pady=10
)
frame.pack(expand=True)

main_lb = Label(
    frame,
    text="Выберите что нужно вычислить"
)
main_lb.grid(row=3, column=1)

permutations_lb = Label(
    frame,
    text="Перестановки",
)
permutations_lb.grid(row=4, column=0)

placements_lb = Label(
    frame,
    text="Размещения",
)
placements_lb.grid(row=4, column=1)

combinations_lb = Label(
    frame,
    text="Сочетания",
)
combinations_lb.grid(row=4, column=2)

"""height_tf = Entry(
    frame,
)
height_tf.grid(row=3, column=2, pady=5)

weight_tf = Entry(
    frame,
)
weight_tf.grid(row=4, column=2, pady=5)

cal_btn = Button(
    frame,
    text='Рассчитать ИМТ',
    command=calculate_bmi
)
cal_btn.grid(row=5, column=2)"""

window.mainloop()
