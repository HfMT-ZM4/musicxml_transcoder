import java.io.*;
import com.softsynth.jmsl.score.Score;
import com.softsynth.jmsl.score.util.MusicXMLWriter;

public class JMSL2MusicXML
{
	public static void main(String[] args)
	{
		if(args.length < 3){
			System.out.println("must supply the name of an input folder, an output folder, and a filename");
			return;
		}
		Score score = null;
		try{
			score = Score.load(args[0] + "/" + args[2]);
		}catch(java.io.IOException e){
			System.out.println("couldn't load " + args[0] + "/" + args[2] + ". caught exception:");
			System.out.println(e.toString());
			return;
		}
		PrintWriter pw;
		try{
			pw = new PrintWriter(args[1] + "/" + args[2]);
		}catch(java.io.FileNotFoundException e){
			System.out.println("couldn't create file test.xml for writing. caught exception: ");
			System.out.println(e.toString());
			return;
		}

		MusicXMLWriter writer = new MusicXMLWriter(score, pw);
		writer.write();
		pw.flush();
		pw.close();
	}
}
