<script>
  export let handleSubmit;
</script>

<form action="GET" on:submit={(e)=>handleSubmit(e)}>
  <input type="text" name="place"
  placeholder="type your location">
  <button type="submit" >Search</button>
</form>

<style>
  form{
		display: flex;
		justify-content: center;
		align-items: end;
		gap: 1em;
		flex-wrap: wrap;
		margin: 1em 1em 1em 1em;
		align-items: baseline;
	}

button{
	padding: 0.5rem;
	font-size: 1em;
  height: 100%;
	background: black;
  margin: 0;
	color: white;
	cursor: pointer;
	border-radius: 16px;
	border: none;
}
button:hover{
	background: #2c2b2b;
}

	input {
		padding: 0.5rem;
		border: 2px solid #2c2b2b;
		border-radius: 16px;
		max-width: 100%;
		width: 300px;
		height: 40px;
		font-size: 1em;
		text-indent: 0.5em;
	}

</style>