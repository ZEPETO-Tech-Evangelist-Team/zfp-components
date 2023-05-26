import { NoEnumerationAttribute } from 'JetBrains.Annotations';
import { Enum } from 'System';
import { GUI, Mathf, Time, Vector3 } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { EnumType } from 'typescript';

export default class Scale extends ZepetoScriptBehaviour
{

    @Header("Scaling Options")
    public xScaleOne : float = 1;
    public yScaleOne : float = 1;
    public zScaleOne : float = 1;

    public speed : float = 1;

    @Header("Optional")

    public useStartValue : boolean = true;
    public xScaleTwo : float = 1;
    public yScaleTwo : float = 1;
    public zScaleTwo : float = 1;

    private scaleStart : Vector3;

    Start()
    {
        //Sets the Original Size
        this.scaleStart = this.gameObject.transform.localScale;
    }

    Update()
    {
        //Create new 3D Vector
        let scale : Vector3 = new Vector3(0,0,0);

        //Assign New Scale
        scale.x = this.xScaleOne;
        scale.y = this.yScaleOne;
        scale.z = this.zScaleOne;

        //Determining the Second Vector (Start or Assigned)
        let scaleTwo : Vector3 
        
        if(this.useStartValue)
        {
            scaleTwo = this.scaleStart;
        }
        else
        {
            scaleTwo = new Vector3(0,0,0);

            // Assign New Scale
            scaleTwo.x = this.xScaleTwo;
            scaleTwo.y = this.yScaleTwo;
            scaleTwo.z = this.zScaleTwo;
        }

        //Get the middle vector & distance from the middle to either other vector
        let halfDistance = Vector3.op_Subtraction(scale, scaleTwo);     //(Vector One - Vector Two)
        halfDistance = Vector3.op_Division(halfDistance, 2);            //((Vector One - Vector Two) / 2)

        let middle = Vector3.op_Addition(halfDistance, scaleTwo);       //(Half Distance (in direction of Vector One) + Vector Two)

        let curAdjust = Vector3.op_Multiply(halfDistance, Mathf.Sin(Time.realtimeSinceStartup * this.speed)); //Current Distance From middle
        this.gameObject.transform.localScale = Vector3.op_Addition(middle, curAdjust); //Current Position
    }
}