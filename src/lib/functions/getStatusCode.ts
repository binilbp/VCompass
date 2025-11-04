export function getStatusCode(angle: number) {
	//north
	if ((angle >= 337.5 && angle < 0) || (angle >= 0 && angle < 22.5)) return 135;
	//northeast
	if (angle >= 22.5 && angle < 67.5) return 136;
	//east
	if (angle >= 67.5 && angle < 112.5) return 137;
	//southeast
	if (angle >= 112.5 && angle < 157.5) return 138;
	//south
	if (angle >= 157.5 && angle < 202.5) return 139;
	//southwest
	if (angle >= 202.5 && angle < 247.5) return 140;
	//west
	if (angle >= 247.5 && angle < 292.5) return 141;
	//northwest
	if (angle >= 292.5 && angle < 337.5) return 142;
	//if nothing works
	return angle;
}
