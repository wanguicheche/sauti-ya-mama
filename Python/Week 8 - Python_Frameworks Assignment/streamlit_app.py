# app.py
import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt

# Load cleaned dataset (from Part 2/3)
df = pd.read_csv("cord19_clean_sample_small.csv")

# --- App Layout ---
st.title("CORD-19 Data Explorer")
st.write("Simple exploration of COVID-19 research papers")

# Year range filter
min_year = int(df['year'].min())
max_year = int(df['year'].max())
year_range = st.slider("Select year range", min_year, max_year, (2020, 2021))

# Filtered data
filtered = df[(df['year'] >= year_range[0]) & (df['year'] <= year_range[1])]

st.subheader("Sample of Filtered Data")
st.write(filtered.head())

# Publications by year
st.subheader("Publications by Year")
year_counts = filtered['year'].value_counts().sort_index()
fig, ax = plt.subplots()
ax.bar(year_counts.index, year_counts.values)
ax.set_xlabel("Year")
ax.set_ylabel("Count")
st.pyplot(fig)

# Top journals
st.subheader("Top Journals")
top_journals = filtered['journal'].value_counts().head(10)
st.bar_chart(top_journals)
