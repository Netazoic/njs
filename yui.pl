#! /usr/bin/perl

my $YUI_PATH = "~/bin";

my $argCt = @ARGV;
if($argCt < 1){
        die(" yui <file_to_compress> \n");
        }
while(<@ARGV>){
my $inFile = pop(@ARGV);



my ($ext) = $inFile =~ /\.([^.]+)$/;

if(! $ext eq "js"){ print "$inFile: This script is for compressing javascript files only\n";next;}


# don't re-min
#
if($inFile =~ /\.min\.js$/){ print "$inFile has already been compressed\n";next;}

my $outFile = $inFile;

$outFile =~ s/\.($ext)$/.min.$ext/;


print ("Compressing $inFile . . . \n");
my $cmd = "java -jar $YUI_PATH/yuicompressor-2.4.8.jar -o $outFile $inFile";

print "$cmd\n";
my $out = `$cmd`;

print $out;
}