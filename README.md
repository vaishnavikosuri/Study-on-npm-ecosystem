# _Too many packages - Is it a real problem?_ - **A study on npm ecosystem**

## Description
This repository contains Jupyter notebooks and datasets used in an empirical study on the npm ecosystem. The primary objective of this project is to investigate whether the rapid and massive proliferation of npm packages poses threats to the stability and sustainability of the ecosystem.

Through the analysis of over 30,000 npm packages, we conducted extensive exploratory data analysis (EDA) to gain a comprehensive understanding of package characteristics and lifecycle trends.

A classification framework was developed to systematically categorize npm packages into the following categories:

Dead

Inactive

Deprecated

Trivial

This categorization was based on predefined parameters and significant predictive features. Additionally, a threat score was devised to quantify potential risks within the ecosystem, helping to identify and prioritize problematic areas.

## Contents
- **Analysis Notebooks**: Jupyter notebooks for conducting different analyses:
  - `rq1_correlation_analysis.ipynb`: Analysis of correlation between metrics.
  - `rq1_metric_distribution_analysis_1_10.ipynb`: Analysis of metric distributions for metrics 1 to 10.
  - `rq1_metric_distribution_analysis_11_20.ipynb`: Analysis of metric distributions for metrics 11 to 20.
  - `rq1_metric_distribution_analysis_21_31.ipynb`: Analysis of metric distributions for metrics 21 to 31.
  - `rq1_metrics_threshold_analysis.ipynb`: Analysis of metrics thresholds.
  - `rq1_package_state_categorization.ipynb`: Categorization of package into states based on metric thresholds and definitions.
  - `rq2_download_and_growth_trend_analysis.ipynb`: Analysis of download and growth trends of different states as well as of the ecosystem.
  - `rq3_analysis.ipynb`: Analysis of potential threat distribution, ANOVA tests and model fitting.

- **Mining Notebooks**: Jupyter notebooks for data mining tasks:
  - `database_clean_up.ipynb`: Cleaning up the database.
  - `database_exploration.ipynb`: Exploring the database.
  - `download_history_merging.ipynb`: Merging download history data.
  - `download_history_mining_idx.ipynb`: Mining download history in parts.
  - `npm_names_merging.ipynb`: Merging npm package names data.
  - `npm_names_mining.ipynb`: Mining npm package names.
  - `npm_names_reversed_mining.ipynb`: Mining npm package names in reverse order.
  - `package_data_merging.ipynb`: Merging package data.
  - `package_data_mining_idx.ipynb`: Mining package data in parts.
  - `sloc/sloc-index.js`: Mining source lines of code data.

- **Data Files**:
  - `columns_to_analyze.txt`: List of columns for distribution analysis.
  - `columns_to_consider.txt`: List of columns to consider for further analysis.
  - `columns_to_correlate.txt`: List of columns to correlate.
  - `columns_with_high_correlation.txt`: List of columns with high correlation.
  - `correlation_matrix.csv`: CSV file containing the correlation matrix of highly correlated columns.
  - `download_history.db`: Database file containing download history data for 30,000 packages.
  - `final_database.db`: Finalized database file containing various metrics for 30,000 packages.
  - `final_metrics.txt`: List of finalized metrics after correlation analysis.
  - `final_packages.txt`: List of 30,000 package names.
  - `metrics_for_categorization.txt`: List of metrics to be used for categorization.
  - `metrics_for_security.txt`: List of metrics to be used for threat score analysis.
  - `npm_names.db`: Database file containing npm package names mined partly.
  - `npm_names.txt`: Comprehensive list of npm package names available from npm replicate registry API.
  - `npm_names_rev.db`: Database file containing npm package names mined partly.
