# Canvas

`<Canvas>` 엘리먼트는 하나 이상의 렌더링 컨텍스트를 노출하여, 출력할 컨텐츠를 생성하고 다룬다.

`getContext()`메서드를 이용해서 렌더링 컨텍스트와 그리기 함수를 사용할 수있다.

2D 그래픽의 경우 `getContext("2d")`로 지정한다.

## 직사각형 도형 예제

```javascript
function draw() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    ctx.fillRect(25, 25, 100, 100); // 색칠된 직사각형을 그린다.
    ctx.clearRect(45, 45, 60, 60); // 직사각형 윤곽선을 그린다.
    ctx.strokeRect(50, 50, 50, 50); // 특정 부분을 지운다. 지워진 부분은 투명해진다.
  }
}
```

## 경로 그리기

`beginPath()`

새로운 경로를 만듭니다. 경로가 생성됬다면, 이후 그리기 명령들은 경로를 구성하고 만드는데 사용하게 됩니다.

`Path 메소드` (Path methods)

물체를 구성할 때 필요한 여러 경로를 설정하는데 사용하는 함수입니다.

`closePath()`

현재 하위 경로의 시작 부분과 연결된 직선을 추가합니다.

`stroke()`

윤곽선을 이용하여 도형을 그립니다.

`fill()`

경로의 내부를 채워서 내부가 채워진 도형을 그립니다.

## 삼각형 그리기 예제

```javascript
function draw() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill();
  }
}
```

## 펜 이동하기

캔버스가 초기화 되었거나 `beginPath()` 메소드가 호출되었을 때, 특정 시작점 설정을 위해 `moveTo()` 함수를 사용한다.

## 선 그리기

`lineTo(x, y)`

현재의 드로잉 위치에서 x와 y로 지정된 위치까지 선을 그립니다.

## 호(arc)

`arc(x, y, radius, startAngle, endAngle, anticlockwise)`

(x, y) 위치에 원점을 두면서, 반지름 r을 가지고, startAngle 에서 시작하여 endAngle 에서 끝나며 주어진 anticlockwise 방향으로 향하는 (기본값은 시계방향 회전) 호를 그리게 됩니다.

`arcTo(x1, y1, x2, y2, radius)`

주어진 제어점들과 반지름으로 호를 그리고, 이전 점과 직선으로 연결합니다.

## 베지어(Bezier) 곡선과 이차(Quadratic)곡선

`quadraticCurveTo(cp1x, cp1y, x, y)`

cp1x 및 cp1y로 지정된 제어점을 사용하여 현재 펜의 위치에서 x와 y로 지정된 끝점까지 이차 베지어 곡선을 그립니다.

`bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`

(cp1x, cp1y) 및 (cp2x, cp2y)로 지정된 제어점을 사용하여 현재 펜 위치에서 x 및 y로 지정된 끝점까지 삼차 베지어 곡선을 그립니다.

## Path2D 오브젝트 (Path2D objects)

```javascript
function draw() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    var rectangle = new Path2D();
    rectangle.rect(10, 10, 50, 50);

    var circle = new Path2D();
    circle.moveTo(125, 35);
    circle.arc(100, 35, 25, 0, 2 * Math.PI);

    ctx.stroke(rectangle);
    ctx.fill(circle);
  }
}

// SVG paths
var p = new Path2D("M10 10 h 80 v 80 h -80 Z");
```

## 색상

`fillStyle = color`

도형을 채우는 색을 설정합니다.

`strokeStyle = color`

도형의 윤곽선 색을 설정합니다.

```javascript
// fillStyle에 적용되는 색은 모두 '오렌지'

ctx.fillStyle = "orange";
ctx.fillStyle = "#FFA500";
ctx.fillStyle = "rgb(255, 165, 0)";
ctx.fillStyle = "rgba(255, 165, 0, 1)";
```

## 투명도

`globalAlpha = transparencyValue`

투명도 값이 설정되면 이후 캔버스에 그려지는 모든 도형들의 투명도가 바뀝니다.

## 선 모양

1. `lineWidth = value`  
   이후 그려질 선의 두께를 설정합니다.  
   `lineWidth`가 픽셀과 딱 맞아 떨어지지 않으면 흐릿한 색으로 채워진다.

2. `lineCap = type`

   선의 끝 모양을 설정합니다.

   - `butt` : 선의 끝이 좌표에 딱맞게 잘립니다.
   - `round` : 선의 끝이 동그랗습니다.
   - `square` : 선 끝에, 선 두께 반만큼의 사각형 영역이 더해집니다.

3. `lineJoin = type`  
   선들이 만나는 "모서리"의 모양을 설정합니다.

   - `round` : 도형의 모서리를, 연결되는 부분들의 공통 끝점을 중심으로 하는 원 모양으로 만듭니다. 이때 원의 반지름은 선의 두께와 같습니다.
   - `bevel` : 도형의 모서리를, 연결되는 부분들의 공통 끝점에서 세모 모양으로 만듭니다.
   - `miter` : 도형의 모서리를, 두 부분의 바깥쪽 테두리 선을 각각 연장하여 교차된 점으로 생긴 마름모꼴 모양으로 만듭니다. miterLimit 속성값에 따라 모양이 달라집니다.

4. `miterLimit = value`  
   두 선이 예각으로 만날 때 접합점의 두께를 제어할 수 있도록, 연결부위의 크기를 제한하는 값을 설정합니다.

5. `getLineDash()`  
   음수가 아닌 짝수를 포함하는 현재 선의 대시 패턴 배열을 반환합니다.

6. `setLineDash(segments)`  
   현재 선의 대시 패턴을 설정합니다.

7. `lineDashOffset = value`  
   선의 대시 배열이 어디서 시작될지 지정합니다.

# 1분코딩 HTML5 캔버스 강좌 정리

고해상도로 표현하기 위해 캔버스의 사이즈를 2배로 늘리고 CSS 속성을 사용해서 원래 사이즈로 줄여주는 방법을 사용한다.

풀 스케일을 가져가고 싶은경우 JS로 사이즈의 2배로 설정하여 캔버스의 사이즈를 설정하고 CSS를 사용해서 100%로 줄여주는 방법을 사용한다.

### 캔버스는 그림을 그리는 것이다.

이미지 객체를 넣을 때에는 외부 데이터를 불러오는 것이므로 `addEventListener('load', function(){})`를 사용하여 이미지가 로드되면 그림을 그리는 함수를 실행시켜야 한다.

`drawImage()` 메소드를 사용하여 이미지를 그릴 수 있다.

### 캔버스에서 비디오를 사용하는 이유는 비디오를 비트맵으로 전환해 조작할 수 있기 때문이다.