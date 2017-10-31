
		Inputmask.extendAliases({
			"phone": {
				url: "/Scripts/phone-codes.js",
				countrycode: "ir",
				mask: function(opts) {
					opts.definitions["#"] = opts.definitions["9"];
					var maskList = [];
					$.ajax({
						url: opts.url,
						async: false,
						dataType: "json",
						success: function(response) {
							maskList = response;
						},
						error: function(xhr, ajaxOptions, thrownError) {
							alert(thrownError + " - " + opts.url);
						}
					});

					maskList = maskList.sort(function(a, b) {
						return (a.mask || a) < (b.mask || b) ? -1 : 1;
					});

					return maskList;
				},
				keepStatic: false,
				nojumps: true,
				nojumpsThreshold: 1,
				onBeforeMask: function(value, opts) {
					var processedValue = value.replace(/^0/g, "");
					if (processedValue.indexOf(opts.countrycode) > 1 || processedValue.indexOf(opts.countrycode) === -1) {
						processedValue = "+" + opts.countrycode + processedValue;
					}

					return processedValue;
				}
			}
		});
	