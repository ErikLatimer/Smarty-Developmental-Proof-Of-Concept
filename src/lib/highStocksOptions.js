import { dataProvider } from './util/dataProvider.js';
//import { deviceInformation } from './src/lib/deviceInformation.js';
import { MobileDetect } from 'mobile-detect';
// This is the native but not standard os module provided by NodeJS to provide information about the currently  running OS
// and service.


const NONMOBILECPUNAMES = ['Intel(R) Core(TM)', 'AMD'];

// This class generates a HighStocks Options Structure and returns it.
export class highChartsOption {
    // MAKE SURE TO ADD A MOBLIE DEFAULT DETERMININED IN THIS METHOD
    // The only reason why we have a currencyPair variable for the generation of the highStock options structure
    // is to be able to provide the data function for the data field of the options structure. Becuase without a currency
    // pair, theres no way to tell what type of data should be fetched, especially since this is a static class.

    // The default reach back of desktop data goes back about 1 week, and then fetches the newest data from the data base.
    // Returns a high charts options structure to be used with the Highcharts initializer.
    static generateDefaultHighstockOptionsObject(currencyPair) {
        // The responsive options needs to go first because this option allows setting for the different charts depending
        // on rules you specify. In this case, our rules will discriminate between a mobile platform and a 
        // laptop/desktop platform.
        var optionStructure = {
            responsive: {
                // We will determine the platform through cpu model name. If not intel or an amd processor, then
                // it is a moblie device.
                rules: [
                    {
                        // This option strucutre is for Desktop.
                        chartOptions: {
                            chart: {
                                description: `This is a default options structure for a line chart for the currency pair ${currencyPair}, generated by the method from the static class highChartsOptions`,
                                // This is the event field for the chart object. We use the load event to incooperate real-time data updates.
                                events: {
                                    load: dataProvider.defaultDesktopDataSource(currencyPair)
                                    // TO DO: Provide the method above
                                },
                                type: "line"
                            },
                            series: [
                                {
                                    type: "line",
                                    // TO DO  implement the initial data
                                    // The x axis will start, by default, at the lowest x-value provided. If no x-value is 
                                    // provided in the data set, then it will be set through pointInterval, which defaults
                                    // to zero.

                                    // The data format will be an array of arrays, that have an x and y value, like this:
                                    // [ [0, 3], [2,4] ]
                                    data: dataProvider.defaultDesktopInitialData(currencyPair)
                                    // TO DO: Provide the method above
                                }
                            ],
                            title: {
                                text: `${currencyPair} Chart`
                            }
                        },
                        condition: {
                            callback: function() {
                                // I'm not so sure mobile detect is going to work on other platforms simply because the user agent electron returns doesn't specify the device, 
                                // just the operating system, so hopefully that's enough for mobile-detect to pick up on the right devices.
                                if ( ! ( MobileDetect.mobile() === null ) ) { return true; }
                                else { return false; }
                                // Not actually sure if the import is correct sense I can't test it without running npm run build becuase the import syntax requires babel XD.
                                // The isDesktop() method in the file deviceInformation is confirmed to work however.
                                //deviceInformation.isDesktop() 
                            }
                        }

                    }
                ]
            }





        }


        return optionStructure;
    }



}
