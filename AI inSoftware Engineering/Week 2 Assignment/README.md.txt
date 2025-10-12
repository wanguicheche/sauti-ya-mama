# 🌍 CO₂ Emissions Prediction (SDG 13: Climate Action)

### 🎯 Project Overview
This project supports **UN SDG 13 – Climate Action** by using machine learning to predict **CO₂ emissions per capita** across countries.  
The model helps identify regions where emissions are rising, so policymakers can take early action.

### 🧠 Machine Learning Approach
- **Type:** Supervised Learning (Regression)
- **Algorithm:** Simple Neural Network (PyTorch)
- **Frameworks:** Python, PyTorch, Pandas, Scikit-learn, Matplotlib
- **Dataset:** *Carbon_(CO2)_Emissions_by_Country.csv* (from open data sources)
- **Target:** Metric Tons of CO₂ per capita
- **Features:** Year, Region, Total CO₂ (Kilotons)

### 🧩 Steps Followed
1. **Data Cleaning & Preprocessing** — handled missing values, extracted year, encoded region.  
2. **Model Training** — small neural network (1 hidden layer, 20 neurons).  
3. **Evaluation** — used MAE and R² to assess performance.  
4. **Visualization** — Predicted vs Actual CO₂ scatter plot for interpretability.  
5. **Ethical Reflection** — addressed fairness and sustainability.

### 📊 Results
| Metric | Score |
|--------|--------|
| Mean Absolute Error | ~0.15 (varies by run) |
| R² Score | ~0.85–0.90 |

The scatter plot shows most predictions align closely with the perfect line, confirming a strong model fit.

### ⚙️ How to Run
```bash
# Install dependencies
pip install torch torchvision torchaudio pandas numpy matplotlib scikit-learn

# Run Jupyter Notebook
jupyter notebook
Then open:
CO2_Emissions_Prediction_SD13_PyTorch.ipynb

🌱 Ethical Reflection

Data completeness varies between developed and developing countries, which can bias the model.
Predictions should assist policy—not replace expert judgment.
