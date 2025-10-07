{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "Australia — Decadal Mean Temperature Anomaly",
    "subtitle": "Mean ΔT vs Baseline (°C) by Decade",
    "dy": 6
  },
  "width": 800,
  "height": 360,
  "data": {
    "url": "https://salini-l.github.io/fit3179-week9-map/data/temp_change_country_year.csv"
  },


  "transform": [
    { "filter": "datum.Area == 'Australia'" },
    { "calculate": "floor(datum.Year/10)*10", "as": "Decade" },
    {
      "aggregate": [
        { "op": "mean", "field": "TempChange_C", "as": "DecadeMean_C" }
      ],
      "groupby": ["Decade"]
    },
    { "sort": [{ "field": "Decade" }] }
  ],

  "encoding": {
    "x": {
      "field": "Decade", "type": "ordinal",
      "title": "Decade", "sort": "ascending",
      "axis": { "labelAngle": 0, "labelPadding": 8, "titlePadding": 6 }
    },
    "y": {
      "field": "DecadeMean_C", "type": "quantitative",
      "title": "Mean ΔT (°C)",
      "axis": { "tickCount": 6, "labelPadding": 4 }
    }
  },

  "layer": [
    { "mark": { "type": "rule", "stroke": "#1f56b6", "strokeDash": [4,4] }, "encoding": { "y": { "datum": 0 } } },

    {
      "mark": { "type": "bar", "cornerRadiusTopLeft": 3, "cornerRadiusTopRight": 3 },
      "encoding": {
        "color": {
          "field": "DecadeMean_C", "type": "quantitative",
          "title": "Decadal warming (°C)",
          "scale": {
            "type": "threshold",
            "domain": [0.5, 1.0, 1.5, 2.0],
            "range": ["#fee5d9","#fcbba1","#fb6a4a","#ef3b2c","#cb181d"]
          }
        },
      
        "tooltip": [
          { "field": "Decade", "title": "Decade" },
          { "field": "DecadeMean_C", "title": "Mean ΔT (°C)", "format": "+.2f" }
        ]
      }
    },

    {
      "mark": { "type": "text", "dy": -5, "fontSize": 12 },
      "encoding": {
        "text": { "field": "DecadeMean_C", "type": "quantitative", "format": "+.2f" },
        "color": { "value": "#111827" }
      }
    },

    {
      "transform": [
        { "aggregate": [{ "op": "mean", "field": "DecadeMean_C", "as": "OverallMean" }] },
        { "calculate": "2020", "as": "LabelX" }
      ],
      "mark": { "type": "rule", "stroke": "#990000", "strokeWidth": 2, "opacity": 0.9 },
      "encoding": {
        "x": { "value": -0.5 },  
        "x2": { "value": 5.5 },
        "y": { "field": "OverallMean" }
      }
    },
    {
      "transform": [
        { "aggregate": [{ "op": "mean", "field": "DecadeMean_C", "as": "OverallMean" }] }
      ],
      "mark": { "type": "text", "align": "left", "dx": 6, "dy": -6, "fontSize": 12, "fill": "#990000" },
      "encoding": {
        "x": { "value": 5.4 },   
        "y": { "field": "OverallMean" },
        "text": { "value": "Mean of Decades" }
      }
    }
  ],

  "config": {
    "axis": { "grid": true },
    "view": { "stroke": null },
    "legend": { "titleFontSize": 12, "labelFontSize": 11 }
  }
}


