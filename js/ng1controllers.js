var app = angular.module("Kart", ['ui.bootstrap']);

app.controller('KartCtrl', function($scope, $modalInstance, kartItems) 
{
   
    $scope.kartitems = kartItems;
    $scope.showContent = false;
	$scope.random = Math.floor(Math.random() * 1234567);
	$scope.totalQtyCount = 0;
    $scope.totalQtyPrice = 0;
	
    $scope.Order = function() {
	    //alert($scope.kartitems.length);
	    $modalInstance.close(0);
    };
    
    $scope.cancel = function() {
	    $modalInstance.dismiss('cancel');
    };
    
    $scope.remove = function(itemQty, index) {
       
        $scope.kartitems.splice(index, 1);
    };
	
	 var TotalAmmount = function () {
        $scope.totalQtyCount = 0;
        $scope.totalQtyPrice = 0;
        for (var i = 0; i < $scope.kartitems.length; i++) {
            $scope.totalQtyCount = $scope.totalQtyCount + $scope.kartitems[i].qty;
            $scope.totalQtyPrice = $scope.totalQtyPrice + $scope.kartitems[i].total;
        }
        //console.log($scope.totalQtyCount + " " + $scope.totalQtyPrice);
    };
    $scope.$watch('kartitems', TotalAmmount, true);
    $scope.ok = function () {
        $scope.kartitems = [];
        $modalInstance.close(0);

    };
	
});


app.controller("MainController", ['$scope', '$http', '$modal', function($scope, $http, $modal, $modalInstance) 
    {
        $scope.totalquantity = 0;
        $scope.kartItems = [];
        $scope.cancel = function() 
		{
            $modalInstance.dismiss('cancel');
        };
		
        $scope.openKart = function()
		{
			if($scope.kartItems.length > 0)
			{
				var modalInstance = $modal.open({
					templateUrl: 'kart.html',
					controller: 'KartCtrl',
					resolve: {
						kartItems: function()
						{
							return $scope.kartItems;
						}
					}
				});		
			}
		    else
			{
			alert(" There is no items in this cart. Continue Shopping... ");
			}
			
        };
        
       $http.get('json/phones.json').success (function(data)				// To load json data - i.e Product list to portal page...
		{
		$scope.guitarVariable = data;
		});
        
        
        $scope.sort = 'price';
        $scope.reverse = 'false';
        $scope.selectedTestAccount = $scope.guitarVariable;
		
        
        $scope.WomenfilterFunction = function(element) 
        {
            return element.category.match(/^Wo/) ? true : false;
        };
        
        $scope.MenfilterFunction = function(element) 
        {
            return element.category.match(/^Me/) ? true : false;
        };
        
        $scope.ChildrenfilterFunction = function(element) 
        {
            return element.category.match(/^Ch/) ? true : false;
        };
        
        $scope.SportsfilterFunction = function(element) 
        {
            return element.category.match(/^Sp/) ? true : false;
        };
        
        $scope.filterOptions = {
            stores: [
                {id: 2,name: 'Show All',rating: 6}, 
                {id: 3,name: 'Price 1 - 10 ',rating: 1}, 
                {id: 4,name: 'Price 11 - 20',rating: 11}, 
                {id: 5,name: 'Price 21 - 30',rating: 21}, 
                {id: 6,name: 'Above 30',rating: 31}
            
            ]
        };
        
        
        $scope.filterItem = {
            store: $scope.filterOptions.stores[0]
        }
        $scope.customFilter = function(persons) {
            
            if ((persons.price >= $scope.filterItem.store.rating) && (persons.price <= $scope.filterItem.store.rating + 10)) {
                return true;
            } else if ($scope.filterItem.store.rating === 6) {
                return true;
            } else {
                return false;
            }
        };
        
        
        $scope.addKart = function(item)  // Product - quantity purchased / selected details...
        {
			var temparray = $scope.kartItems.filter(function (e)
			{
                return e.id == item.id;
            })
			
			if (temparray.length == 0) 
			{
				//alert(item.id)
				var newItem = angular.copy(item);
				newItem.qty = 1;
				$scope.kartItems.push(newItem);
			}
			else
			{
				for(i=0;i<$scope.kartItems.length;i++)
				{
					if($scope.kartItems[i].id == item.id)
					{
					 $scope.kartItems[i].qty = $scope.kartItems[i].qty + 1;
					}
				}
			}
        };
        
        
        $scope.tabs = [{
                title: 'Mens Accessories',
                content: 'Men',
                url: 'men.html'
            }, {
                title: 'Women Accessories',
                content: 'Women',
                url: 'women.html'
            
            }, {
                title: 'Children Accessories',
                content: 'Children',
                url: 'children.html'
            }, {
                title: 'Sports Accessories',
                content: 'Sport',
                url: 'sports.html'
            }];
        
        $scope.currentTab = 'men.html';
        
        $scope.onClickTab = function(tab) {
            $scope.currentTab = tab.url;
        }
        
        $scope.isActiveTab = function(tabUrl) {
            return tabUrl == $scope.currentTab;
        }
    
    }]
);
