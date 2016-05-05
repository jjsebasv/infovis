$( document ).ready(function() {
	function total(a,b) {
	  if (a.total > b.total)
	    return -1;
	  else if (a.total < b.total)
	    return 1;
	  else 
	    return 0;
	};

	function average(a,b) {
	  if (a.averageOfIrrelevancy > b.averageOfIrrelevancy)
	    return -1;
	  else if (a.averageOfIrrelevancy < b.averageOfIrrelevancy)
	    return 1;
	  else 
	    return 0;
	};

	function relevants(a,b) {
	  if (a.relevant > b.relevant)
	    return -1;
	  else if (a.relevant < b.relevant)
	    return 1;
	  else 
	    return 0;
	};

	function irrelevants(a,b) {
	  if (a.irrelevant < b.irrelevant)
	    return -1;
	  else if (a.irrelevant > b.irrelevant)
	    return 1;
	  else 
	    return 0;
	}

	sortByAverage = function(objs) {
		return objs.sort(average);
	};

	sortByTotal = function(objs) {
		return objs.sort(total);
	};

	sortByRelevant = function(objs) {
		return objs.sort(relevants);
	};

	sortByIrrelevant = function(objs) {
		return objs.sort(irrelevants);
	};

});