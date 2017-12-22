$('#root').html("<ul><li><span>Сделать задание #3 по web-программированию</span><button onclick='$(this).parent().remove()'>Удалить</button></li></ul>");
function add_task(){
	$('#root ul').append('<li><span>' + $('#add_task_input').val() + '</span><button onclick="$(this).parent().remove()">Удалить</button></li></ul>');
}
$('#root').append("<input id=add_task_input type='text'><button id=add_task onclick=add_task()>Добавить задание</button>")