# XGBoost Deep Dive: Technical Assignment

This repository contains a comprehensive technical deep dive into Gradient Boosting Machines (XGBoost), including theoretical explanations, experimental code, and a professional website for presentation.

## Project Structure

```text
xgboost-deep-dive/
├── index.html          # Homepage
├── article.html        # Technical Article
├── experiments.html    # Results and Visuals
├── assets/
│   ├── css/style.css   # Premium dark mode styles
│   ├── js/script.js    # UI Interactivity
│   └── images/         # Generated plots
├── experiments/
│   ├── xgboost_experiment.py  # Python ML code
│   └── results/        # Raw metrics
└── README.md
```

## Reproducibility Instructions

### 1. Prerequisites
Ensure you have Python 3.8+ installed.

### 2. Install Dependencies
Run the following command to install the required libraries:
```bash
pip install xgboost scikit-learn matplotlib seaborn pandas
```

### 3. Run Experiments
Execute the Python script to generate results and graphs:
```bash
python experiments/xgboost_experiment.py
```
This will:
- Train Random Forest and XGBoost models on the Breast Cancer dataset.
- Save accuracy comparison, feature importance, and confusion matrix plots to `assets/images/`.
- Save raw metrics to `experiments/results/metrics.txt`.

### 4. View Website
Open `index.html` in any modern web browser to view the technical write-up and experimental results.

## Author
*Antigravity (Google DeepMind)*
