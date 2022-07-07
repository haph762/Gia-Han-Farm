using Aspose.Cells;
using Aspose.Cells.Drawing;

namespace API.Helpers.Utilities
{
    public static class AsposeCellsUtility
    {
        public static void SetLicense()
        {
            try
            {
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Resources", "Aspose.Total.lic");
                var fileStream = new FileStream(filePath, FileMode.Open);
                var cellLicense = new Aspose.Cells.License();
                cellLicense.SetLicense(fileStream);
            }
            catch (System.Exception)
            {
                throw;
            }
        }

        public static Style SetAllBorders(this Style style)
        {
            style.Borders[BorderType.BottomBorder].LineStyle = CellBorderType.Thin;
            style.Borders[BorderType.TopBorder].LineStyle = CellBorderType.Thin;
            style.Borders[BorderType.LeftBorder].LineStyle = CellBorderType.Thin;
            style.Borders[BorderType.RightBorder].LineStyle = CellBorderType.Thin;
            return style;
        }

        public static Style SetAlignCenter(this Style style)
        {
            style.IsTextWrapped = true;
            style.HorizontalAlignment = TextAlignmentType.Center;
            style.VerticalAlignment = TextAlignmentType.Center;
            return style;
        }

        public static Picture SetPictureSize(this Picture picture)
        {
            var originWidth = picture.Width;
            var originHeight = picture.Height;
            var customWidth = 100;
            var customHeight = (int)(originHeight * customWidth / originWidth);

            picture.Top = 5;
            picture.Left = 5;
            picture.Width = customWidth;
            picture.Height = customHeight;

            return picture;
        }
    }
}