export function calcTileType(index, size) {  
  const sizeXY = size.x * size.y
  if (index === sizeXY - 1) return 'bottom-right'; 
  if (index === sizeXY - size.y) return 'bottom-left'; 
  if (index === size.y - 1) return 'top-right';
  if (index === 0) return 'top-left';
  if (!(index % size.y)) return 'left';
  if (!((index + 1) % size.y)) return 'right';
  if (index > sizeXY - size.y) return 'bottom';
  if (index > size.y) return 'center';
  if (index > 0) return 'top';
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}




