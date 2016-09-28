<?php
/**
 * Created by PhpStorm.
 * User: wangzhong
 * Date: 16/9/28
 * Time: 14:09
 */

require_once "HttpHelper.php";

class spider {

    protected $baseUrl;
    protected $url;
    protected $module;

    public function __construct($module, $baseUrl, $url)
    {
        $this->baseUrl = $baseUrl;
        $this->module = $module;
        $this->url = $url;

    }

    public function start($type = null)
    {

        $baseUrlInfo = parse_url($this->baseUrl);

        //获取保存文件的后缀名

        $html = HttpHelper::get($this->baseUrl);

        $this->downloadAndSave();

        $urls = array();


        //获取href src
        preg_match_all('/src\s*=\s*(\'|\")(.*?)\\1[^>]*?\/?\s*>/i', $html, $match);
        $urls = array_merge($urls, $match[2]);
        preg_match_all('/href\s*=\s*(\'|\")(.*?)\\1[^>]*?\/?\s*>/i', $html, $match);
        $urls = array_merge($urls, $match[2]);
        $urls = array_unique($urls);

        foreach ($urls as $url) {
            $url = parse_url($url);
            $url = $url['path'];
            $extName = pathinfo($url, PATHINFO_EXTENSION);

            if($type == null || ($extName == $type)) {
                $this->url = $url;
                $content = $this->downloadAndSave();
                if($extName == 'css' || $extName == 'js') {
                    $match = [];
                    preg_match_all('/url\((.+)\)/i', $content, $match);
                    foreach ($match[1] as $item) {
                        $item = str_replace("../", '', $item);
                        $this->url = $item;
                        $this->downloadAndSave();
                    }
                }
            } else {
            }

        }

    }

    public function downloadAndSave()
    {

        $urlInfo = parse_url($this->url);
        //有scheme不需要下载
        if (!empty($urlInfo['scheme'])) {
            return false;
        }
        $first = substr($this->url, 0, 1);
        $baseUrlInfo = parse_url($this->baseUrl);

        if($first == '/') {
            $requestUrl = $baseUrlInfo['scheme'] ."://" . $baseUrlInfo['host'] . $this->url;
        } else {
            $requestUrl = $this->baseUrl . $this->url;
        }
        $content = HttpHelper::get($requestUrl);

        $baseDir = pathinfo($this->url, PATHINFO_DIRNAME);
        $baseDir = ($baseDir == '.') ? "" : $baseDir;
        $basePath = realpath(dirname(__DIR__)) . '/' . $this->module . '/';
        $dir = ($basePath . $baseDir);

        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        $url = parse_url($this->url);
        $url = $url['path'];
        $url = (empty($url)) ? 'index.html' : $url;
        $fileName = $basePath . $url;
        file_put_contents($fileName, $content);

        echo "get $fileName \n";

        return $content;
    }


}







//$baseUrl = "http://wxoauth.wucai.com/xyn/SecretGardenOfficial/";
//$url = "";
//$module = 'secret';


$baseUrl = "http://m.buick.com.cn/act/aspirations/";
$url = "";
$module = 'buick';

$spider  = new spider($module, $baseUrl, $url);
$spider->start();
