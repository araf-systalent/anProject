;(function() {


	/**
	 * Place to store API URL or any other constants
	 * Usage:
	 *
	 * Inject CONSTANTS service as a dependency and then use like this:
	 * CONSTANTS.API_URL
	 */
  angular
  	.module('app')
    .constant('site.config', {
      'APP_NAME': 'United Rental',
	  'SERVER' : {
			'NAME': 'serverNamedd',
			'START_DATE': '2018-01-15',
			'END_DATE': '---'
	  },
      'SEVERITYLIST':[{'name':'Very High','value':'VERY_HIGH'},{'name':'High','value':'HIGH'},{'name':'Medium','value':'MEDIUM'},{'name':'Low','value':'LOW'}],	  
	  'SIMULATION_API_BASE' : 'http://ec2-54-70-140-59.us-west-2.compute.amazonaws.com:8080/',
	  
	  
    });

})();
