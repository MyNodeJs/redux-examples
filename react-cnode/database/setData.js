export default function(n, val) {
	var val
	if(typeof val == 'object') {
		val = JSON.stringify(val)
	}

	localStorage.setItem(n, val)
}