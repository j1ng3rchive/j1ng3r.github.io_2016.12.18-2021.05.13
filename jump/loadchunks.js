Block.size=function(i,j,a){
	var max=0;
	console.error(Block.stats);
	for(i in Block.stats){
		console.debug(i,Block.stats[i]);
		Block.chunkey[Block.stats[i].char]=i;
		a=camera.createSprite(i,`jump/sprites/block_${i}.png`);
		console.debug(a,"a.width = "+a.width);
		max=Math.max(max,a.width,a.height);
		Block.sizes[i]=new Point(a).div(2);
	}
	return max;
}();
var chunks=null;
function chunkify(){
    for(var i of Block.all){
        if(i.x-camera.x<-Block.size)
            i.kill();
    }
    if(Block.last_X*Block.size-camera.x<camera.c.width+Block.size){
        addChunk(Math.floor(chunks.length*Math.random()));
    }
}
function addChunk(a){
    console.info("Adding Chunk");
	var next_chunk=Object.deepCopy(chunks[a]).reverse(),merge_layer=-1,i,j,last_layer;
	for(i in next_chunk){
		if(next_chunk[i][0]=="#")merge_layer=i;
        if(next_chunk[i].slice(-1)=="#")last_layer=i;
	}
    var t,x,y;
	for(i in next_chunk){
		for(j in next_chunk[i]){
			if(next_chunk[i][j]!=" "){
                t=Block.chunkey[next_chunk[i][j]];
                x=(+j+Block.last_X)*Block.size;
                y=(i-merge_layer+Block.last_Y)*Block.size;
                new Block(t,x,y);
            }
		}
	}
    Block.last_X+=next_chunk[0].length;
    Block.last_Y+=last_layer-merge_layer;
}
