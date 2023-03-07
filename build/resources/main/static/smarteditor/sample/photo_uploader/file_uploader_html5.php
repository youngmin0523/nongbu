<?php
 	$sFileInfo = '';
	$headers = array();

	/*  
	 * 기존 소스코드
	 foreach($_SERVER as $k => $v) {
	    //echo "$k"."/    ".$v.'<br>';
		if(substr($k, 0, 9) == "HTTP_FILE") {
			$k = substr(strtolower($k), 5);
			$headers[$k] = $v;
		} 
	} 
	
	$filename = rawurldecode($headers['file_name']);
	$filename_ext = strtolower(array_pop(explode('.',$filename)));
	$allow_file = array("jpg", "png", "bmp", "gif");
	*/
    
	$file_info = $_FILES['file'];
	
	$filename = rawurldecode($file_info['name']);
	$filename_ext = strtolower(array_pop(explode('.',$filename)));
	$allow_file = array("jpg", "png", "bmp", "gif"); 

	
	if(!in_array($filename_ext, $allow_file)) {
		echo "NOTALLOW_".$filename;
	} else {
		$file = new stdClass;
		//$file->name = date("YmdHis").mt_rand().".".$filename_ext;
		//$file->content = file_get_contents("php://input");
		$file->name = date("YmdHis") . "_" . $filename;
		
		$uploadDir = "../../../../../uploads/images/manual/";
		
		if(!is_dir($uploadDir)){
			mkdir($uploadDir, 0777);
		}

		$newPath = $uploadDir.$file->name;
		
		if(move_uploaded_file($file_info['tmp_name'], $newPath)) {
			$sFileInfo .= "&bNewLine=true";
			$sFileInfo .= "&sFileName=".$filename;
			$sFileInfo .= "&sFileURL=/uploads/images/manual/".$file->name;       // file 저장 위치
		}

		echo $sFileInfo;
	}
?>