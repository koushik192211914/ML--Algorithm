import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import xgboost as xgb
import os

# Set visual style
sns.set_theme(style="whitegrid")
plt.rcParams['figure.figsize'] = (10, 6)

# Create directories if they don't exist
os.makedirs('assets/images', exist_ok=True)
os.makedirs('experiments/results', exist_ok=True)

def run_experiments():
    # 1. Load Data
    data = load_breast_cancer()
    X = pd.DataFrame(data.data, columns=data.feature_names)
    y = data.target
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # 2. Train Random Forest
    rf = RandomForestClassifier(n_estimators=100, random_state=42)
    rf.fit(X_train, y_train)
    y_pred_rf = rf.predict(X_test)
    acc_rf = accuracy_score(y_test, y_pred_rf)
    
    # 3. Train XGBoost
    # Using the scikit-learn API for XGBoost
    xgb_model = xgb.XGBClassifier(n_estimators=100, learning_rate=0.1, max_depth=5, random_state=42, use_label_encoder=False, eval_metric='logloss')
    xgb_model.fit(X_train, y_train)
    y_pred_xgb = xgb_model.predict(X_test)
    acc_xgb = accuracy_score(y_test, y_pred_xgb)
    
    # 4. Save Accuracy Comparison
    plt.figure(figsize=(8, 5))
    models = ['Random Forest', 'XGBoost']
    accuracies = [acc_rf, acc_xgb]
    sns.barplot(x=models, y=accuracies, palette='viridis')
    plt.title('Accuracy Comparison: Random Forest vs XGBoost')
    plt.ylabel('Accuracy')
    plt.ylim(0.9, 1.0)
    for i, v in enumerate(accuracies):
        plt.text(i, v + 0.005, f"{v:.4f}", ha='center', fontweight='bold')
    plt.savefig('assets/images/accuracy_comparison.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # 5. Save Feature Importance (XGBoost)
    plt.figure(figsize=(10, 8))
    feat_importances = pd.Series(xgb_model.feature_importances_, index=X.columns)
    feat_importances.nlargest(10).sort_values().plot(kind='barh', color='skyblue')
    plt.title('Top 10 Feature Importances (XGBoost)')
    plt.xlabel('Score')
    plt.savefig('assets/images/feature_importance.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # 6. Save Confusion Matrix (XGBoost)
    plt.figure(figsize=(8, 6))
    cm = confusion_matrix(y_test, y_pred_xgb)
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', cbar=False)
    plt.title('Confusion Matrix - XGBoost')
    plt.xlabel('Predicted Label')
    plt.ylabel('True Label')
    plt.savefig('assets/images/confusion_matrix.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # 7. Save results to a text file
    with open('experiments/results/metrics.txt', 'w') as f:
        f.write(f"Random Forest Accuracy: {acc_rf:.4f}\n")
        f.write(f"XGBoost Accuracy: {acc_xgb:.4f}\n")
        f.write("\nClassification Report (XGBoost):\n")
        f.write(classification_report(y_test, y_pred_xgb))

    print("Experiments completed. Graphs saved to assets/images/")

if __name__ == "__main__":
    run_experiments()
