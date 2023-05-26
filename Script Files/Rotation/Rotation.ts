import { Enum } from 'System';
import { Mathf, Time, Vector3 } from 'UnityEngine';
import { LinearColor } from 'UnityEngine.Experimental.GlobalIllumination';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export enum Type
{
    Linear = 0,
    Sine = 1
}

export default class Rotation extends ZepetoScriptBehaviour
{
    @Header("Rotation Options")
    public xRotation : float;
    public yRotation : float;
    public zRotation : float;

    @Header("Rotation Types")
    public type : Type;
    public sineSpeed : float = 1;

    Update()
    {
        //Create new 3D Vector
        let rot : Vector3 = new Vector3(0,0,0);

        //Assign New Rotation
        rot.x = this.xRotation;
        rot.y = this.yRotation;
        rot.z = this.zRotation;

        //Rotate
        if(this.type == 0)
        {
            this.gameObject.transform.Rotate(rot); //Rotate Normally
        }
        else
        {
            let sineRot = Vector3.op_Multiply(rot, Mathf.Sin(Time.realtimeSinceStartup * this.sineSpeed)); //Rotate with Sine Wave
            this.gameObject.transform.Rotate(sineRot);
        }


    }
}