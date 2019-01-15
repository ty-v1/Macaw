<script>
    import Line from "vue-chartjs/es/BaseCharts/Line";

    export default {
        extends: Line,
        created() {
            this.unwatch = this.$store.watch(
                state => state.VariantStore.idToVariant,
                () => this.renderLineChart());
        },
        mounted() {
            this.renderLineChart();
        },
        beforeDestroy() {
            // ウォッチャをリセットする
            this.unwatch();
        },
        methods: {
            renderLineChart: function () {
                const chartData = this.$store.getters['VariantStore/generationNumberToFitnessStatistics'];

                // Overwriting base render method with actual data.
                this.renderChart(
                    {
                        labels: this.getLabels(chartData),
                        datasets: [
                            {
                                label: 'Max',
                                backgroundColor: '#F87979',
                                borderColor: "#F87979",
                                borderWidth: 1,
                                fill: false,
                                data: this.getMaxData(chartData)
                            },
                            {
                                label: 'Min',
                                backgroundColor: '#79F879',
                                borderColor: "#79F879",
                                borderWidth: 1,
                                fill: false,
                                data: this.getMinData(chartData)
                            },
                            {
                                label: 'Average',
                                backgroundColor: '#7979F8',
                                borderColor: "#7979F8",
                                borderWidth: 1,
                                fill: false,
                                data: this.getAverageData(chartData)
                            }
                        ]
                    },
                    {
                        animation: false,
                        maintainAspectRatio: false,
                        scales: {
                            xAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Generation',
                                    fontSize: 18
                                },
                            }],
                            yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Fitness',
                                    fontSize: 18
                                },
                                ticks: {
                                    min: 0.0,
                                    max: 1.0,
                                    stepSize: 0.1,
                                }
                            }]
                        },
                        styles: {
                            height: '100%',
                            position: 'relative'
                        },
                        elements: {
                            line: {
                                tension: 0,
                            }
                        }
                    });
            },
            getLabels: function (chartData) {
                const labels = [];

                for (let i = 0; i < chartData.length; i++) {
                    labels.push(String(i));
                }

                return labels;
            },
            getMaxData: function (chartData) {
                const data = [];

                chartData.forEach((chartDatum) => {
                    data.push(chartDatum.max);
                });

                return data;
            },
            getMinData: function (chartData) {
                const data = [];

                chartData.forEach((chartDatum) => {
                    data.push(chartDatum.min);
                });

                return data;
            },
            getAverageData: function (chartData) {
                const data = [];

                chartData.forEach((chartDatum) => {
                    data.push(chartDatum.sum / chartDatum.count);
                });

                return data;
            }
        }
    }
</script>
