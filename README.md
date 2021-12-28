# plotly-challenge
In this assignment, you will build an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.
(The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.)
# Step 1: Plotly

1. Use the D3 library to read in `samples.json`.

2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

* Use `sample_values` as the values for the bar chart.

* Use `otu_ids` as the labels for the bar chart.

* Use `otu_labels` as the hovertext for the chart.

![bar_chart](https://user-images.githubusercontent.com/89142142/147592689-c8e9feed-9ec9-467a-a778-b68bf95fd939.png)


3. Create a bubble chart that displays each sample.

* Use `otu_ids` for the x values.

* Use `sample_values` for the y values.

* Use `sample_values` for the marker size.

* Use `otu_ids` for the marker colors.

* Use `otu_labels` for the text values.

[Bubble Chart]

4. Display the sample metadata, i.e., an individual's demographic information.

5. Display each key-value pair from the metadata JSON object somewhere on the page.

6. Update all of the plots any time that a new sample is selected.

![bubble_chart](https://user-images.githubusercontent.com/89142142/147592713-612962ea-2f4f-493f-be62-b50f6cbc29fd.png)


Additionally, you are welcome to create any layout that you would like for your dashboard. An example dashboard is shown below:
<img width="1274" alt="DashBoard" src="https://user-images.githubusercontent.com/89142142/147592730-a446c0cc-895d-4afd-9a49-ed316d2a24ba.png">
<img width="1272" alt="Dashboard2" src="https://user-images.githubusercontent.com/89142142/147593395-c765ae75-42ad-45cf-a352-2f354fa0def7.png">


Dashboard Image Source: https://www.msif.org/news/2018/09/27/the-role-of-genes-in-ms/ 


# Advanced Challenge Assignment (Optional)

The following task is advanced and therefore optional.

* Adapt the Gauge Chart from <https://plot.ly/javascript/gauge-charts/> to plot the weekly washing frequency of the individual.

* You will need to modify the example gauge code to account for values ranging from 0 through 9.

![Bonus_chart](https://user-images.githubusercontent.com/89142142/147592763-e526dcf3-5899-4ac6-b5d6-958917a102d1.png)


* Update the chart whenever a new sample is selected.
