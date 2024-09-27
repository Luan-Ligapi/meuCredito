import pandas as pd

# Dados fornecidos
data = [
    {"datavencimento": "2022-09-05", "capitalaberto": 27.61},
    {"datavencimento": "2022-10-05", "capitalaberto": 27.61},
    {"datavencimento": "2022-11-05", "capitalaberto": 27.61},
    {"datavencimento": "2022-12-05", "capitalaberto": 27.65},
    {"datavencimento": "2022-09-27", "capitalaberto": 25.98},
    {"datavencimento": "2022-10-27", "capitalaberto": 25.98},
    {"datavencimento": "2022-08-26", "capitalaberto": 31.98},
    {"datavencimento": "2022-09-26", "capitalaberto": 31.98},
    {"datavencimento": "2022-10-26", "capitalaberto": 31.98},
    {"datavencimento": "2022-11-26", "capitalaberto": 31.98},
    {"datavencimento": "2022-12-26", "capitalaberto": 31.98},
    {"datavencimento": "2022-09-27", "capitalaberto": 17.6},
    {"datavencimento": "2022-10-27", "capitalaberto": 17.6},
    {"datavencimento": "2022-11-27", "capitalaberto": 17.6},
    {"datavencimento": "2022-12-27", "capitalaberto": 17.6},
    {"datavencimento": "2023-01-27", "capitalaberto": 17.6},
    {"datavencimento": "2022-09-14", "capitalaberto": 10},
    {"datavencimento": "2022-10-14", "capitalaberto": 10},
    {"datavencimento": "2022-11-14", "capitalaberto": 10},
    {"datavencimento": "2022-12-14", "capitalaberto": 10},
    {"datavencimento": "2022-09-12", "capitalaberto": 20},
    {"datavencimento": "2022-10-12", "capitalaberto": 20},
    {"datavencimento": "2022-11-12", "capitalaberto": 20},
    {"datavencimento": "2022-12-12", "capitalaberto": 20},
    {"datavencimento": "2023-01-12", "capitalaberto": 20},
    {"datavencimento": "2022-09-24", "capitalaberto": 11.6},
    {"datavencimento": "2022-10-24", "capitalaberto": 11.6},
    {"datavencimento": "2022-11-24", "capitalaberto": 11.6},
    {"datavencimento": "2022-12-24", "capitalaberto": 11.6},
    {"datavencimento": "2023-01-24", "capitalaberto": 11.6},
    {"datavencimento": "2022-09-22", "capitalaberto": 29.98},
    {"datavencimento": "2022-10-22", "capitalaberto": 29.98},
    {"datavencimento": "2022-11-22", "capitalaberto": 29.98},
    {"datavencimento": "2022-12-22", "capitalaberto": 29.98},
    {"datavencimento": "2023-01-22", "capitalaberto": 29.98},
    {"datavencimento": "2022-09-26", "capitalaberto": 31.98},
    {"datavencimento": "2022-10-26", "capitalaberto": 31.98},
    {"datavencimento": "2022-09-28", "capitalaberto": 48.94},
    {"datavencimento": "2022-10-28", "capitalaberto": 48.94},
    {"datavencimento": "2022-09-25", "capitalaberto": 38.71},
    {"datavencimento": "2022-10-25", "capitalaberto": 38.71},
    {"datavencimento": "2022-11-25", "capitalaberto": 38.71},
    {"datavencimento": "2022-08-31", "capitalaberto": 50},
    {"datavencimento": "2022-09-30", "capitalaberto": 50},
    {"datavencimento": "2022-08-31", "capitalaberto": 55.96},
    {"datavencimento": "2022-09-30", "capitalaberto": 55.96},
    {"datavencimento": "2022-10-31", "capitalaberto": 55.96},
    {"datavencimento": "2022-11-30", "capitalaberto": 55.96},
    {"datavencimento": "2022-12-31", "capitalaberto": 55.96},
    {"datavencimento": "2022-10-05", "capitalaberto": 73.98},
    {"datavencimento": "2022-11-05", "capitalaberto": 73.98},
    {"datavencimento": "2022-12-05", "capitalaberto": 73.98},
    {"datavencimento": "2023-01-05", "capitalaberto": 73.98},
    {"datavencimento": "2023-02-05", "capitalaberto": 73.98},
    {"datavencimento": "2022-09-22", "capitalaberto": 16.23},
    {"datavencimento": "2022-08-27", "capitalaberto": 24.75},
    {"datavencimento": "2022-09-27", "capitalaberto": 24.75},
    {"datavencimento": "2022-10-27", "capitalaberto": 24.75},
    {"datavencimento": "2022-11-27", "capitalaberto": 24.75},
    {"datavencimento": "2023-01-03", "capitalaberto": 33.6},
    {"datavencimento": "2023-02-03", "capitalaberto": 33.6},
    {"datavencimento": "2023-03-03", "capitalaberto": 33.6},
    {"datavencimento": "2023-04-03", "capitalaberto": 33.6},
    {"datavencimento": "2022-12-06", "capitalaberto": 101.92},
    {"datavencimento": "2023-01-06", "capitalaberto": 101.92},
    {"datavencimento": "2023-02-06", "capitalaberto": 101.92},
    {"datavencimento": "2023-03-06", "capitalaberto": 101.92},
    {"datavencimento": "2023-04-06", "capitalaberto": 101.92},
]

# Criação do DataFrame
df = pd.DataFrame(data)

# Conversão da coluna 'datavencimento' para datetime
df['datavencimento'] = pd.to_datetime(df['datavencimento'])

# Extraindo ano e mês
df['ano_mes'] = df['datavencimento'].dt.to_period('M')

# Agrupando e somando os valores de 'capitalaberto' por ano e mês
report = df.groupby('ano_mes')['capitalaberto'].sum().reset_index()

# Renomeando a coluna para facilitar a leitura
report.columns = ['Ano_Mes', 'Total_Capital_Aberto']

# Exibindo o relatório final
print(report)
