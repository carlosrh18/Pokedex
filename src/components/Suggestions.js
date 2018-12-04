import React from 'react'

const Suggestions = (props) => {
	//console.log(props);
	if(props != null){
		console.log(props.results);
		const options = 
    		<li>
      			{props.results.name}
    		</li>;
 	 	return <ul>{options}</ul>
	}
	else{
		return null;
	}
}

export default Suggestions